import { describe, expect, it } from "vitest";
import request from 'supertest';
import nock from 'nock'

import Server from '../server.js'

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

function runNock(response) {
  nock('http://localhost:7000')
  .get('/auth')
  .reply(200, response)
}

const mockValidResponse = {
  isLoggedIn: true,
  userId: 'nf28btxngkrvn8q0gogpnb86'
}

const mockInvalidResponse = {
  isLoggedIn: false,
  userId: 'nf28btxngkrvn8q0gogpnb86'
} 

runNock(mockValidResponse)
runNock(mockValidResponse)
runNock(mockInvalidResponse)

describe('PATCH /:id', () => {
  const { app } = new Server

  describe('given a valid recipeId', async () => {
    const response = await request(app).patch('/api/v1/recipes/f9smrwidoda4rlswde7tjkwm')

    it('should respond with status 200', async () => {
      expect(response.statusCode).toBe(200)
    })

    it('should respond with status: "success" and a json object in a particular format', () => {
      const date = new Date()
      date.setSeconds(0, 0)

      const copySampleData = structuredClone(sampleData)
      copySampleData.isFavorite[1] = mockValidResponse.userId
      copySampleData.lastModified = date.toISOString()

      const mockResult = {
        headers: { 'Content-Type': 'application/json' },
        statusCode: 200,
        status: 'success',
        data: copySampleData
      }

      expect(response.body).toEqual(mockResult)
    })
  })

  describe('given an invalid recipeId', async () => {
    const response = await request(app).patch('/api/v1/recipes/xxzjc67224x5ikm4adpb9s8w')

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

  describe('given an invalid user from fetched data', async () => {
    const response = await request(app).patch('/api/v1/recipes/f9smrwidoda4rlswde7tjkwm')

    it('should respond with status code 400', () => {
      expect(response.statusCode).toBe(400)
    })

    it('should respond with status: "fail" and a json object in a particular format', () => {
      const mockResult = {
        headers: { 'Content-Type': 'application/json' },
        statusCode: 400,
        status: 'fail',
        message: 'User is not authenticated'
      }

      expect(response.body).toEqual(mockResult)
    })
  })
})