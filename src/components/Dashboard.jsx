import { useEffect } from "react";
import ImageCard from "./ImageCard";
import VideoCard from "./VideoCard";
const Dashboard = ({ assets, searchTerm, setSearchTerm }) => {
  const { resources } = assets
  console.log('estos son los recursos',resources)
  useEffect(()=>{},[searchTerm])
  return (<>
    <main>
      <h2>welcome to drive</h2>
      <input type="text" className="main-search" placeholder="search in drive..."
        value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      <div className="uploads-container">
        {resources?.map(asset => asset.resource_type == 'image' && <ImageCard key={asset.asset_id} asset={asset} />
          ||
          <VideoCard key={asset.asset_id} asset={asset} />
        )}
      </div>
    </main>
  </>)

}
export default Dashboard