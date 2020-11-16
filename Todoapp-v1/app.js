//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");


const app = express();


/*
let items=["Buy Cook", "Cook Food", "Eat Food"];
let workitems=[];*/
// apka używa expressa jako view engine..




app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
// implementowanie styli na strone i do expressa
app.use(express.static("public"));



mongoose.connect("mongodb+srv://admin-maks:Test123@cluster0.ijo7z.mongodb.net/todolistDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);


const item1 = new Item({
    name: "Welcome to your todo list!"
});
const item2 = new Item({
    name: "Hit the + button to add a new item"
});
const item3 = new Item({
    name: "<-- Hit this to delete and item."
});

const defaultItems = [item1, item2, item3];

/*Item.insertMany(defaultItems, (err) => {
    if(err){
        console.log(err);
    }else {
        console.log("Succesfully saved default items to DB.");
    }
});*/
const listSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);


app.get("/", (req, res) => {
    
    Item.find({}, (error, foundItems) =>{

        if(foundItems.length === 0){
            
            Item.insertMany(defaultItems, (error) => {
                if(error){
                    console.log(error);
                }else {
                    console.log("Succesfully saved default items to DB.");
                }
            });
        } else {
            res.render('list', {listTitle: "Today", newListItem: foundItems});
        }
    });    
});

app.get("/:customListName", (req, res)=>{
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({name:customListName},(error, foundList)=>{
        if(!error){
            if(!foundList){
                const list = new List({
                        name:customListName,
                        items: defaultItems
                    });
                    list.save();
                    res.redirect("/" + customListName);

            }else{
                res.render('list', {listTitle: foundList.name, newListItem: foundList.items});
            }
        }
    });

  
});
// aby tego użyć trzeba stworzyć funkcję bodyParser app.use
app.post("/", (req,res)=> {
    
    const itemName = req.body.newItem;
    const listName = req.body.list;
    const item = new Item({
        name: itemName
    });

    if(listName === "Today"){
        item.save();
        res.redirect("/");
    }else {
        List.findOne({name: listName}, (error, foundList)=>{
            foundList.items.push(item);
            foundList.save();
            res.redirect("/" + listName);
        });
    }
    
});

app.post("/delete", (req, res) =>{

    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;

    if (listName === "Today"){
         Item.findByIdAndRemove(checkedItemId, (error)=> {
        if(!error){
            console.log("Udało się usunąć element z bazy.");
            res.redirect("/");
        }
    });
    }else {
        List.findOneAndUpdate({name: listName}, {$pull: {items:{_id: checkedItemId}}}, (error, foundList)=>{
            if(!error){
                res.redirect("/"+ listName);
            }
        })
    }

   
})


app.listen(3000, ()=> {
    console.log("server started on port 3000");
});