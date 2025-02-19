import {v2 as cloudinary} from 'cloudinary'
cloudinary.config({
  cloud_name:import.meta.env.VITE_CLOUD_NAME,
  api_key:import.meta.env.VITE_KEY,
  api_secret:import.meta.env.VITE_SECRET
})
const handler=async (req , res) =>{
  const data = await cloudinary.search.execute()
  res.status(200).json(data.resources)
}
export default handler;