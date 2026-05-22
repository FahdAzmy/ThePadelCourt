const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const PadelCourt = require("./models/Court.Model.js");
const User = require("./models/User.Model.js");
require("dotenv").config();

const SALT_ROUNDS = 12;

const baseSlots = [
  { start: "08:00 AM", end: "09:00 AM" },
  { start: "09:00 AM", end: "10:00 AM" },
  { start: "06:00 PM", end: "07:00 PM" },
  { start: "07:00 PM", end: "08:00 PM" },
  { start: "08:00 PM", end: "09:00 PM" },
  { start: "09:00 PM", end: "10:00 PM" },
];

const courtsData = [
  {
    name: "The Neon Pit",
    location: "New Cairo • Indoor",
    pricePerHour: 45,
    courtImg: { url: "/FirstCourt.jpg", public_id: "seed_neon_pit" },
  },
  {
    name: "Shadow Glass Arena",
    location: "Nasr City • Pro Glass",
    pricePerHour: 55,
    courtImg: { url: "/Court.png", public_id: "seed_shadow_glass" },
  },
  {
    name: "Skyline Padel Club",
    location: "Maadi • Rooftop",
    pricePerHour: 50,
    courtImg: { url: "/Background.jpg", public_id: "seed_skyline" },
  },
  {
    name: "Velocity Court",
    location: "Heliopolis • Indoor",
    pricePerHour: 42,
    courtImg: { url: "/Padel2.jpg", public_id: "seed_velocity" },
  },
  {
    name: "Baseline Black Court",
    location: "Sheikh Zayed • Double",
    pricePerHour: 48,
    courtImg: { url: "/Padel club.png", public_id: "seed_baseline_black" },
  },
  {
    name: "The Rally Room",
    location: "6th October • Academy",
    pricePerHour: 38,
    courtImg: { url: "/PadelGallery.png", public_id: "seed_rally_room" },
  },
  {
    name: "Glassline Arena",
    location: "Madinaty • Premium",
    pricePerHour: 60,
    courtImg: { url: "/PadelPlayer.jpg", public_id: "seed_glassline" },
  },
  {
    name: "Clubhouse Court",
    location: "Zamalek • Club",
    pricePerHour: 52,
    courtImg: { url: "/Court.png", public_id: "seed_clubhouse" },
  },
  {
    name: "Lime Light Court",
    location: "Tagamoa • Night Play",
    pricePerHour: 47,
    courtImg: { url: "/FirstCourt.jpg", public_id: "seed_lime_light" },
  },
  {
    name: "The Padel Dome",
    location: "Giza • Covered",
    pricePerHour: 44,
    courtImg: { url: "/Background.jpg", public_id: "seed_padel_dome" },
  },
];

function buildAvailability(daysInAdvance = 14) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return Array.from({ length: daysInAdvance }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);

    return {
      date,
      timeSlots: baseSlots,
    };
  });
}

async function getSeedOwner() {
  const existingOwner = await User.findOne({ role: "owner" });

  if (existingOwner) {
    return existingOwner;
  }

  const hashedPassword = await bcrypt.hash("password123", SALT_ROUNDS);

  return User.create({
    name: "Seed Owner",
    email: "owner@thepadelcourt.com",
    password: hashedPassword,
    role: "owner",
  });
}

async function seedCourts() {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is missing from Backend/.env");
    }

    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to database");

    const owner = await getSeedOwner();
    const availability = buildAvailability();

    for (const court of courtsData) {
      await PadelCourt.updateOne(
        { name: court.name },
        {
          $set: {
            ...court,
            ownerId: owner._id,
            operatingHours: {
              start: "08:00 AM",
              end: "10:00 PM",
            },
            availability,
          },
        },
        { upsert: true, runValidators: true }
      );
    }

    const seededCourts = await PadelCourt.find({
      name: { $in: courtsData.map((court) => court.name) },
    }).select("name location pricePerHour");

    console.log(`Seeded ${seededCourts.length} courts:`);
    seededCourts.forEach((court) => {
      console.log(`- ${court.name} (${court.location}) $${court.pricePerHour}/hr`);
    });
  } catch (error) {
    console.error("Error seeding courts:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedCourts();
