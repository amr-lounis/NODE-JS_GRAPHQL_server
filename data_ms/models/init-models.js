var DataTypes = require("sequelize").DataTypes;

var _product_category = require("./product_category");
var _product_stock = require("./product_stock");
var _product_unit = require("./product_unit");
var _product = require("./product");

var _sold_invoice = require("./sold_invoice");
var _sold_product = require("./sold_product");

var _authorization = require("./authorization");

var _role = require("./role");

var _user = require("./user");

var _todo = require("./todo");

const  {initDB} = require('./init-db')

class InitModels{
    constructor(sequelize) {
        console.log("------------------------------: InitModels constructor");
        
        var product_category = _product_category(sequelize, DataTypes);
        var product_stock = _product_stock(sequelize, DataTypes);
        var product_unit = _product_unit(sequelize, DataTypes);
        var product = _product(sequelize, DataTypes);

        var sold_invoice = _sold_invoice(sequelize, DataTypes);
        var sold_product = _sold_product(sequelize, DataTypes);

        var authorization = _authorization(sequelize, DataTypes);

        var role = _role(sequelize, DataTypes);

        var user = _user(sequelize, DataTypes);

        var todo = _todo(sequelize, DataTypes);
        //------------------------------------------------------------------------
        role.hasMany(user);
        user.belongsTo(role);
        //------------------------------------------------------------------------
        product_category.hasMany(product_category , { foreignKey: "productCategoryId" });
        product_category.belongsTo(product_category, { foreignKey: "productCategoryId" });

        product_category.hasMany(product);
        product.belongsTo(product_category);

        product_unit.hasMany(product);
        product.belongsTo(product_unit);

        product.hasMany(product_stock);
        product_stock.belongsTo(product);
        //------------------------------------------------------------------------
        sold_invoice.hasMany(sold_product);
        sold_product.belongsTo(sold_invoice);
        //------------------------------------------------------------------------
        user.hasMany(sold_invoice, { foreignKey: "employeeId" });
        sold_invoice.belongsTo(user, { foreignKey: "employeeId" });

        user.hasMany(sold_invoice, { foreignKey: "customerId" });
        sold_invoice.belongsTo(user, { foreignKey: "customerId" });
        //------------------------------------------------------------------------
        user.hasMany(todo, { foreignKey: "employeeId" });
        todo.belongsTo(user, { foreignKey: "employeeId" });

        user.hasMany(todo, { foreignKey: "customerId" });
        todo.belongsTo(user, { foreignKey: "customerId" });
        //------------------------------------------------------------------------
        product.hasMany(sold_product);//id 1 yat3awad fi akthar min stok
        sold_product.belongsTo(product);// lakin kol stok yochir ila produit wahad
        //------------------------------------------------------------------------

        this.model = {
            product_category,
            product_stock,
            product_unit,
            product,
            sold_invoice,
            sold_product,
            authorization,
            role,
            user,
            todo
        };

        //User.sync() - This creates the table if it doesn't exist (and does nothing if it already exists)
        //User.sync({ force: true }) - This creates the table, dropping it first if it already existed
        //User.sync({ alter: true }) - This checks what is the current state of the table in the
        sequelize.sync().then(() => {
            initDB(this.model)
        });
    }

    get(){
        return this.model ;
    }
}

module.exports = InitModels