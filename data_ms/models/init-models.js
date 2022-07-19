var DataTypes = require("sequelize").DataTypes;

var _payment = require("./payment");

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

class InitModels{
    constructor(sequelize) {
        console.log("------------------------------: InitModels constructor");
        
        var payment = _payment(sequelize, DataTypes);

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
        user.hasMany(payment, { foreignKey: "employeeId" });
        payment.belongsTo(user, { foreignKey: "employeeId" });

        user.hasMany(payment, { foreignKey: "customerId" });
        payment.belongsTo(user, { foreignKey: "customerId" });
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

        sequelize.sync({ force: false });

        this.model = {
            payment,
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
        console.log(this.model)
    }

    get(){
        return this.model ;
    }
}

module.exports = InitModels
