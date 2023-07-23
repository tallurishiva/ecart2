//jshint esversion:6
const express = require("express");
const cors=require("cors");
const nodemailer=require("nodemailer");
const bodyParser = require("body-parser");
const multer = require('multer');
const mongoose=require("mongoose");
const md5=require("md5");
mongoose.connect("mongodb+srv://shivatalluri725:Shiva551@cluster0.xtiys65.mongodb.net/newpro");
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gowithfurnigo@gmail.com',
    pass: 'muiltaktpvexflaj'
  }
});
const SellerSchema=new mongoose.Schema({
    name: String,
    email: String,
    phone: String, 
    address: String
});
const CartSchema=new mongoose.Schema({
     cartid:String,
     p_id:{type:[{pid:String,quantity:{ type: Number, min: 1 }}],default:[]},
     tcost:{type:Number,default:0}
});
const LoginSchema=new mongoose.Schema({
  Name:String,
  email:{type:String,require:true},
  password:{type:String,require:true},
  phone:{type:Number,min:10000000},
  seller:{type:Boolean,default:false},
  address:{street: {type:String,default:""},
  city: {type:String,default:""},
  state: {type:String,default:""},
  postalCode:{type:Number,default:""}}
});
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: {
    type: String,default:"notfound"
   },
  newimg:{ data: Buffer,
    contentType: String
  },
  colors: { type: [String], required: true },
  company: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  shipping: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  sid:{type:String,default:"123"}
});
var seller = mongoose.model('seller', SellerSchema);
var Product = mongoose.model('Product', productSchema);
var cart=mongoose.model("cart",CartSchema);
var user=mongoose.model("user",LoginSchema);
//var blog=mongoose.model("blog",blogSchema);
const app = express();
app.use(express.json());
//app.set('view engine', 'ejs');
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
//app.use(express.static("public"));
app.use(cors());
const storage = multer.memoryStorage();
//const upload = multer({ dest: 'uploads/' });
const upload = multer({ storage: storage });
app.post("/signup",function(req,res){
  console.log(req.body);
  const newuser={
    Name:req.body.name,
  email:req.body.email,
  password:md5(req.body.password),
  phone:req.body.number
  }
  var otp=Math.floor(Math.random()*10000)
  var msg=`Dear `+newuser.Name+`,

  Thank you for choosing Furnigo Shopping Site for your online shopping needs! To ensure the security of your account and protect your personal information, we have implemented a One-Time Password (OTP) verification process.
  
  To complete your registration/transaction, please use the following OTP:
  
  OTP:`+otp+`
  
  Please enter the provided OTP on the designated field during the registration/checkout process to proceed. Please note that this OTP is valid for a limited time and can only be used once.
  
  If you did not initiate this registration/transaction or have any concerns about your account's security, please contact our customer support immediately at [Customer Support Contact Information] to resolve the issue.
  
  Thank you for being a valued customer of Furnigo Shopping Site. We strive to provide you with a secure and seamless shopping experience.
  
  Best regards,
  
  shiva rama krishna
  Furnigo Shopping Site
  [Your Contact Information]`;
 const mailOptions = {
   from: 'gowithfurnigo@gmail.com',
   to: newuser.email,
   subject: 'Furnigo Shopping Site - One-Time Password (OTP) Verification',
   text:msg,
 };
 transporter.sendMail(mailOptions, function(error, info) {
   if (error) {
     console.log(error);
   } else {
     console.log("sent successfully");
     console.log('Email sent: ' + info.response);
     nemail=newuser.email;
     //otps.push({nemail:otp});
   }
 });
 
  user.find({email:newuser.email})
    .then(function(found){
      console.log(found);
      if(found.length==0){
        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("sent successfully");
            console.log('Email sent: ' + info.response);
            nemail=newuser.email;
            //otps.push({nemail:otp});
          }
        });
        var data=req.body;
        res.send({otp:otp});}
      else{
        res.send("err");
      }
})});
var proitems=[
  {
      "id": "recZkNf2kwmdBcqd0",
      "name": "accent chair",
      "price": 25999,
      "image": "https://www.course-api.com/images/store/product-1.jpeg",
      "colors": [
          "#ff0000",
          "#00ff00",
          "#0000ff"
      ],
      "company": "marcos",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "office",
      "shipping": true
  },
  {
      "id": "recEHmzvupvT8ZONH",
      "name": "albany sectional",
      "price": 109999,
      "image": "https://www.course-api.com/images/store/product-2.jpeg",
      "colors": [
          "#000",
          "#ffb900"
      ],
      "company": "liddy",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "living room"
  },
  {
      "id": "rec5NBwZ5zCD9nfF0",
      "name": "albany table",
      "price": 309999,
      "image": "https://www.course-api.com/images/store/product-3.jpeg",
      "colors": [
          "#ffb900",
          "#0000ff"
      ],
      "company": "liddy",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "kitchen"
  },
  {
      "id": "recd1jIVIEChmiwhe",
      "name": "armchair",
      "price": 12599,
      "image": "https://www.course-api.com/images/store/product-4.jpeg",
      "colors": [
          "#000",
          "#00ff00",
          "#0000ff"
      ],
      "company": "marcos",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "bedroom",
      "shipping": true
  },
  {
      "id": "recotY5Nh00DQFdkm",
      "name": "dining table",
      "price": 42999,
      "image": "https://www.course-api.com/images/store/product-5.jpeg",
      "colors": [
          "#00ff00",
          "#0000ff",
          "#ff0000"
      ],
      "company": "ikea",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "dining",
      "shipping": true
  },
  {
      "id": "rec1Ntk7siEEW9ha1",
      "name": "emperor bed",
      "price": 23999,
      "image": "https://www.course-api.com/images/store/product-6.jpeg",
      "colors": [
          "#0000ff",
          "#000"
      ],
      "company": "ikea",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "bedroom",
      "shipping": true
  },
  {
      "id": "recNZ0koOqEmilmoz",
      "name": "entertainment center",
      "price": 59999,
      "image": "https://www.course-api.com/images/store/product-7.jpeg",
      "featured": true,
      "colors": [
          "#000",
          "#ff0000"
      ],
      "company": "caressa",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "living room",
      "shipping": true
  },
  {
      "id": "recrfxv3EwpvJwvjq",
      "name": "high-back bench",
      "price": 39999,
      "image": "https://www.course-api.com/images/store/product-8.jpeg",
      "featured": true,
      "colors": [
          "#000",
          "#00ff00"
      ],
      "company": "ikea",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "office",
      "shipping": true
  },
  {
      "id": "recoW8ecgjtKx2Sj2",
      "name": "leather chair",
      "price": 20099,
      "image": "https://www.course-api.com/images/store/product-9.jpeg",
      "colors": [
          "#ff0000",
          "#ffb900",
          "#00ff00"
      ],
      "company": "caressa",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "bedroom"
  },
  {
      "id": "recEOA6qtDag1hRbU",
      "name": "leather sofa",
      "price": 99999,
      "image": "https://www.course-api.com/images/store/product-10.jpeg",
      "colors": [
          "#00ff00",
          "#0000ff"
      ],
      "company": "caressa",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "office"
  },
  {
      "id": "recoAJYUCuEKxcPSr",
      "name": "modern bookshelf",
      "price": 31999,
      "image": "https://www.course-api.com/images/store/product-11.jpeg",
      "featured": true,
      "colors": [
          "#ffb900",
          "#ff0000",
          "#00ff00"
      ],
      "company": "caressa",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "kids"
  },
  {
      "id": "recQ0fMd8T0Vk211E",
      "name": "modern poster",
      "price": 3099,
      "image": "https://www.course-api.com/images/store/product-12.jpeg",
      "colors": [
          "#000"
      ],
      "company": "liddy",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "living room",
      "shipping": true
  },
  {
      "id": "rec7CjDWKRgNQtrKe",
      "name": "shelf",
      "price": 30999,
      "image": "https://www.course-api.com/images/store/product-13.jpeg",
      "colors": [
          "#00ff00"
      ],
      "company": "ikea",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "living room"
  },
  {
      "id": "recF0KpwlkF7e8kXO",
      "name": "simple chair",
      "price": 109999,
      "image": "https://www.course-api.com/images/store/product-14.jpeg",
      "colors": [
          "#0000ff"
      ],
      "company": "liddy",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "living room",
      "shipping": true
  },
  {
      "id": "recs5BSVU3qQrOj4E",
      "name": "sofa set",
      "price": 129999,
      "image": "https://www.course-api.com/images/store/product-15.jpeg",
      "colors": [
          "#00ff00",
          "#ffb900"
      ],
      "company": "marcos",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "living room",
      "shipping": true
  },
  {
      "id": "recroK1VD8qVdMP5H",
      "name": "suede armchair",
      "price": 15999,
      "image": "https://www.course-api.com/images/store/product-16.jpeg",
      "colors": [
          "#ffb900"
      ],
      "company": "caressa",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "office"
  },
  {
      "id": "rec7JInsuCEHgmaGe",
      "name": "utopia sofa",
      "price": 79999,
      "image": "https://www.course-api.com/images/store/product-17.jpeg",
      "featured": true,
      "colors": [
          "#ff0000",
          "#00ff00"
      ],
      "company": "liddy",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "living room"
  },
  {
      "id": "rec3jeKnhInKHJuz2",
      "name": "vase table",
      "price": 120999,
      "image": "https://www.course-api.com/images/store/product-18.jpeg",
      "featured": true,
      "colors": [
          "#ff0000"
      ],
      "company": "marcos",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "office"
  },
  {
      "id": "recv2ohxljlK2FZO7",
      "name": "wooden bed",
      "price": 250099,
      "image": "https://www.course-api.com/images/store/product-19.jpeg",
      "colors": [
          "#000",
          "#ffb900"
      ],
      "company": "ikea",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "bedroom"
  },
  {
      "id": "recJIjREF3dlFi3sR",
      "name": "wooden desk",
      "price": 150999,
      "image": "https://www.course-api.com/images/store/product-20.jpeg",
      "colors": [
          "#000"
      ],
      "company": "ikea",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "office",
      "shipping": true
  },
  {
      "id": "recm7wC8TBVdU9oEL",
      "name": "wooden desk",
      "price": 40099,
      "image": "https://www.course-api.com/images/store/product-21.jpeg",
      "colors": [
          "#0000ff",
          "#00ff00"
      ],
      "company": "ikea",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "office"
  },
  {
      "id": "rectfNsySwAJeWDN2",
      "name": "wooden table",
      "price": 234999,
      "image": "https://www.course-api.com/images/store/product-22.jpeg",
      "featured": true,
      "colors": [
          "#ffb900",
          "#ff0000"
      ],
      "company": "caressa",
      "description": "Cloud bread VHS hell of banjo bicycle rights jianbing umami mumblecore etsy 8-bit pok pok +1 wolf. Vexillologist yr dreamcatcher waistcoat, authentic chillwave trust fund. Viral typewriter fingerstache pinterest pork belly narwhal. Schlitz venmo everyday carry kitsch pitchfork chillwave iPhone taiyaki trust fund hashtag kinfolk microdosing gochujang live-edge",
      "category": "kitchen",
      "shipping": true
  }
];
Product.find({}).then(found=>{if(found.length===0){
  Product.insertMany(proitems);
  console.log("items inserted successfully");
  }
}).catch(error=>console.error());
app.post("/seller",(req,res)=>{
  console.log("seller==",req.body);
  res.send("u became a seller");
})
app.get("/accounts/:eid",(req,res)=>{
  const eid=req.params.eid;
  user.findOne({email:eid}).then(found=>res.send(found)).catch(err=>console.error());
})
app.post("/useraddress",(req,res)=>{
  adrs=req.body.address;
  eid=req.body.eid;
  user.findOneAndUpdate({email:eid},{$set:{"address.street":adrs.street,"address.city":adrs.city,"address.state":adrs.state,"address.postalCode":adrs.postalCode}}).then(()=>res.send(success)).catch(err=>console.error());
})
app.post("/addtocart",(req,res)=>{
  //console.log("request:::::::::::"+req.body.eid+"::"+req.body.pid+"::"+req.body.quantity);
  cart.findOneAndUpdate({ cartid: req.body.eid},{ $push: { p_id: { pid:req.body.pid, quantity:req.body.quantity } }})
  .then(found =>{
          console.log("cart found:"+found);
  })
  .catch(err =>{
    console.log(err);
  });
  res.send("success");
});
app.post("/otp",function(req,res){
  const newuser={
    Name:req.body.data.name,
  email:req.body.data.email,
  password:md5(req.body.data.password),
  phone:req.body.data.number
  }
  user.insertMany([newuser])
  .then((suc)=>{
    cart.insertMany([{cartid:suc[0].email}]);
    res.send({sts:"success",dit:suc[0].email});
  })
  .catch(err=>{console.log(err);
        res.send({sts:"error",dit:null}); 
  });
})
app.post("/login",function(req,res){
  user.find({email:req.body.email,password:md5(req.body.password)})
    .then(function(found){
      //console.log(found);
      if(found.length!=0){
        res.send("success");}
      else{
        res.send("err");
      }
})});
/*app.post('/addpro', upload.single('file'), (req, res) => {
  //console.log(req.body);
  console.log(req.file);
  if (!req.file){
    return res.status(400).json({ error: 'No image provided' });
  }
  Product.insertMany([{sid:req.body.eid,name:req.body.name,price:req.body.price,company:req.body.company,category:req.body.category,description:req.body.description,newimg:req.body.file}])
  .then(()=>{console.log("inserted successfully")}).catch(err=>{console.log(err)});
   res.send("ok");
});*/
//const multer = require('multer');
//const upload = multer({ dest: 'uploads/' }); // Set the destination folder for uploaded files

//const multer = require('multer');
//const upload = multer(); // Assuming you have multer configured correctly

app.post('/addpro', upload.single('file'), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  if (!req.file) {
    return res.status(400).json({ error: 'No image provided' });
  }

  const base64Image = Buffer.from(req.file.buffer).toString('base64');

  const productData = {
    sid: req.body.eid,
    name: req.body.name,
    price: req.body.price,
    company: req.body.company,
    category: req.body.category,
    description: req.body.description,
    newimg: base64Image,
  };

  Product.insertMany([productData])
    .then(() => {
      console.log("Inserted successfully");
      res.send("ok");
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: 'Failed to insert product' });
    });
});
app.post("/cart", function(req, res) {
  console.log(req.body);
  const id = req.body.pid;
  if(req.body.quantity===1){
    cart.findOneAndUpdate({ cartid: req.body.eid},{ $push: { p_id: { pid:id, quantity:req.body.quantity } }})
    .then(found =>{
            console.log("cart found:"+found);
    })
    .catch(err =>{
      console.log(err);
    });
  }
  else if(req.body.quantity===0){
    cart.findOneAndUpdate({ cartid: req.body.eid},{ $pull: { p_id: { pid:id } }})
    .then(found =>{
            console.log("cart found:"+found);
    })
    .catch(err =>{
      console.log(err);
    });
  }
  else{
  cart.findOneAndUpdate({ cartid: req.body.eid,"p_id.pid":id},{ $set: { "p_id.$.quantity":req.body.quantity }})
    .then(found =>{
      //if (!found[0].p_id.includes(req.body.pid)){
            console.log("cart found:"+found);
     // }
    })
    .catch(err => {
      console.log(err);
    });}});
app.post("/cartdel",function(req,res){
  cart.findOneAndUpdate({ cartid: req.body.eid},{ $pull: { p_id: { pid:req.body.pid } }})
    .then(found =>{
            console.log("cart found:"+found);
    })
    .catch(err =>{
      console.log(err);
    });
    res.send("deleted");
})
app.post("/cartcomp",function(req,res){
  const id=req.body.eid;
  cart.find({cartid:id}).then(found=>{
      res.send(found);
    }
  )
  .catch(error=>console.error());
});
app.get("/products",function(req,res){
  Product.find({}).then(found=>{res.send(found)}).catch(error=>console.error());
});
app.get("/products/:id",function(req,res){
  const id=req.params.id;
  //console.log(id);
  Product.find({id:id}).then(found=>{res.send(found)}).catch(error=>console.error());
});
app.listen(3001, function(){
  console.log("Server started on port 3001");
});
