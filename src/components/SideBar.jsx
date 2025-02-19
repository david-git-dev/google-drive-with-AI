import CloudinaryUploadWidget from "./CloudinaryUploadWidget"
import { useState } from 'react';
const SideBar =()=>{
  const [publicId, setPublicId] = useState('');
  return(<>
  <article className="side-bar">

    <CloudinaryUploadWidget uwConfig={
     {
      cloudName: import.meta.env.VITE_CLOUD_NAME,
      uploadPreset:import.meta.env.VITE_UPLOAD_PRESET,
      language:'en',
      text: {
        "en": {
            "queue": {
                "title": "Files to upload",
                "title_uploading_with_counter": "Uploading {{num}} files"
            },
            "crop": {
                "title": "Crop your image"

            }
        }
      }
     }
    }
    setPublicId={setPublicId}
    />
<ul>
  <li>Home</li>
  <li>Activity</li>
  <li>Workspaces</li>
  <br />
  <li>Shared drives</li>
  <br />
  <li>Shared with me</li>
  <li>Recent</li>
  <li>Starred</li>
  <br />
  <li>Spam</li>
  <li>Trash</li>
  <li>Storage</li>
</ul>
  </article>
    </>)
}
export default SideBar