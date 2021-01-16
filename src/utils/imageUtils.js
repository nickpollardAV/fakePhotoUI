import axios from 'axios'

const imageUtils = {
    sendImageToServer: async function sendImageToServer (image) {
        try {
            const formData= new FormData()
            formData.append(process.env.REACT_APP_BACKEND_URL, image)
            let response = await axios.post(process.env.REACT_APP_BACKEND_URL, formData)
            console.log(response)
            return response
        } catch(exception) {
            throw new Error(exception)
        }
    }
}

export default imageUtils
