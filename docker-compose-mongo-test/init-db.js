const fs = require('fs')

const recipeData = JSON.parse(
    fs.readFileSync(`mongo-seed/importRecipes.json`, 'utf-8')
)

const userData = JSON.parse(
    fs.readFileSync(`mongo-seed/importUsers.json`, 'utf-8')
)

mainDB = db.getSiblingDB('mainDB')
mainDB.recipes.insertMany(recipeData)
mainDB.users.insertMany(userData)