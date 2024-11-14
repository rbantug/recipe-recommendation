import { describe, expect, it } from "vitest";
import request from 'supertest';

import Server from '../../server.js'
import token from "../../utils/token.js";
import { recipesDB } from "../../database/index.js";

process.env.JWT_SECRET = 'papaya'
process.env.JWT_EXPIRES_IN = 600000

const userId = 'ttvwv2pikps7f6ihm38cc3yw'

const testToken = await token.signToken({ userId })

const sampleData = {
  "id": "f9smrwidoda4rlswde7tjkwm",
  "recipeName": "Rockmelon-infused Venison Roast",
  "cuisine": "Chinese",
  "sourceWebsite": "Made with Lau",
  "url": "https://mild-cleaner.info",
  "imgUrl": "https://loremflickr.com/1153/2600?lock=5391606674858218",
  "description": "Our crunchy ostrich, slow-cooked to perfection, accompanied by steamed green pepper and a rich, savory gravy.",
  "ingredients": [
    "papaw",
    "star anise"
  ],
  "isFavorite": [
    "tykUeGK5KGWi27CswKBrR36E"
  ]
}

describe('PATCH /:id', () => {
  const { app } = new Server

  describe('given a valid recipeId', async () => {
    const response = await request(app).patch('/api/v1/recipes/f9smrwidoda4rlswde7tjkwm')
      .set('Accept-Language', 'en')
      .set('authorization', [`Bearer ${testToken}`])

    it('should respond with status 200', async () => {
      expect(response.statusCode).toBe(200)
    })

    it('should respond with status: "success" and a json object in a particular format', () => {
      const date = new Date()
      date.setSeconds(0, 0)

      const copySampleData = structuredClone(sampleData)
      copySampleData.isFavorite[1] = userId
      copySampleData.lastModified = date.toISOString()

      const mockResult = {
        headers: { 'Content-Type': 'application/json' },
        statusCode: 200,
        status: 'success',
        data: copySampleData
      }

      expect(response.body).toEqual(mockResult)
    })

    await recipesDB.deleteOneRecipe({ id: 'f9smrwidoda4rlswde7tjkwm' })

    await recipesDB.insertManyRecipes([ sampleData ])
  })

  describe('given an invalid recipeId in a "development" environment', async () => {
    process.env.NODE_ENV = 'development'

    const response = await request(app).patch('/api/v1/recipes/xxzjc67224x5ikm4adpb9s8w')
    .set('Accept-Language', 'en')
    .set('authorization', [`Bearer ${testToken}`])

    it('should respond with status 400', () => {
      expect(response.statusCode).toBe(400)
    })

    it('should respond with status: "fail" and a json object in a particular format', () => {
      const mockResult = {
        headers: { 'Content-Type': 'application/json' },
        statusCode: 400,
        status: 'fail',
        message: 'The recipe does not exist'
      }

      delete response.body.stack

      expect(response.body).toEqual(mockResult)
    })
  })

  describe('given an invalid recipeId in a "production environment"', async () => {
    process.env.NODE_ENV = 'production'

    const response = await request(app).patch('/api/v1/recipes/xxzjc67224x5ikm4adpb9s8w')
    .set('Accept-Language', 'en')
    .set('authorization', [`Bearer ${testToken}`])

    it('should respond with status 400', () => {
      expect(response.statusCode).toBe(400)
    })

    it('should respond with status: "fail" and a json object in a particular format', () => {
      const mockResult = {
        headers: { 'Content-Type': 'application/json' },
        statusCode: 400,
        status: 'fail',
        message: 'The recipe does not exist'
      }

      expect(response.body).toEqual(mockResult)
    })
  })
})