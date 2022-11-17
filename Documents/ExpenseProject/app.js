const express=require('express')

const app=express()
const bycrpt=require('bcrypt')
const sequelize=require('./Util/database')
const bodyParser = require('body-parser');

const adminRoutes=require('./Routes/admin')
const expenRoutes=require('./Routes/expen')
const purchaseRouter = require('./Routes/purchase')
const resetPasswordRoutes=require('./Routes/forgetpass')

const Order = require('./Models/order');
const User = require('./Models/user');
const Expense = require('./Models/UserExpense');
const Forgotpassword = require('./Models/forgotpassword');




var cors=require('cors');
app.use(cors());
app.use(bodyParser.json())
app.use(adminRoutes)
app.use(expenRoutes)

app.use('/payment' , purchaseRouter)

app.use('/password', resetPasswordRoutes);


User.hasMany(Expense)
Expense.belongsTo(User)

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

sequelize
// .sync({force:true})
.sync()
.then(result=>{
    app.listen(8000)
})
.catch(err=>{
    console.log(err)
})


