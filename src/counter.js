fetch("https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-espaces-verts-frais/records?limit=20")
.then((data)=> data.json())
.then((response)=> console.log(response)).catch((error) => console.error (error))



    
 