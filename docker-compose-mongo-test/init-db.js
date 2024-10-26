const fs = require('fs')

const data = JSON.parse(
    fs.readFileSync(`mongo-seed/importRecipes.json`, 'utf-8')
)

mainDB = db.getSiblingDB('mainDB')
mainDB.recipes.insertMany(data)

