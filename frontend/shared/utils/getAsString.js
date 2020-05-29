// Helper function to only return the first instance of a param if there are multiple ones in the URL
export function getAsString(value){
  if(Array.isArray(value)) {
      return value[0];
  }

  return value;
}