
const Valid =(ww)=>{
//console.log(ww);

    const errors={
        NameOfStadium : "",
        Discription: "",
        ImgeUrl: "",
        Price : "",
        Location: ""
    }

  
    if(!ww.NameOfStadium.trim() || ww.NameOfStadium.length<3 || ww.NameOfStadium.length> 24 ){
        errors.NameOfStadium="invalid title must be atleast 3 "
    }
    if(!ww.Discription.trim() ||ww.Discription.length<10 || ww.Discription.length> 100 ){
        errors.Discription="invalid Discription must be atleast 10 "
    }
    if(!ww.Location.trim() ||ww.Location.length<3 || ww.Location.length> 24 ){
        errors.Location="invalid Location"
    }
    var urlRegex=/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(ww.ImgeUrl);
    if(!ww.ImgeUrl.trim() || !urlRegex){
        errors.ImgeUrl="invalid url"

    }
    if(!ww.Price.trim()|| isNaN(ww.Price)){
        errors.Price="invalid price must be number"

    }

    return{errors}
}
export default Valid ;