export let googleMapObject = null;
//common func n var
export const mapInitOnLoad = (map) => {
return new Promise(resolve => {
    map.load(api => {
        googleMapObject = !googleMapObject ? api: googleMapObject;
        resolve(googleMapObject);
    })
  }); 
}