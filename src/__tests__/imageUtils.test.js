import imageUtils from '../utils/imageUtils'
import sinon from 'sinon'
import axios from 'axios'

describe('imageUtils', () => {
    describe('sendImageToServer', () => {

        beforeEach(() => {
            process.env.REACT_APP_BACKEND_URL = "testUrl"
        })

        test('calls axios post with required formdata', () => {
            
            const formData= new FormData()
            formData.append("testUrl", "testImage")
            axios.post = jest.fn()

            imageUtils.sendImageToServer("testImage")

            expect(axios.post).toHaveBeenCalledWith(formData)
        })

        test('when axios fails to get valid response, an exception is thrown', async () => {
            sinon.stub(axios, 'post').throws("some fake error")

            let error;
            try {
                await imageUtils.sendImageToServer("testImage")
            } catch (e) {
                error = e;
            }

            expect(error).toEqual(new Error("some fake error"))
        })

        test('returns valid result when image is successfully processed', async () => {
            sinon.stub(axios, 'post').returns({isFake: true, percentageFake: "testPercentage"})

            const result = await imageUtils.sendImageToServer("testImage")

            expect(result).toStrictEqual({isFake: true, percentageFake: "testPercentage"})
        })
    })
    
    afterEach(() => {
        jest.clearAllMocks()
        jest.resetModules()
        sinon.restore()
    })
})
