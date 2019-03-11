export const mockresponse = {
        "status": "success",
        "path": [
          ["22.372081", "114.107877"],
          ["22.326442", "114.167811"],
          ["22.284419", "114.159510"]
        ],
        "total_distance": 20000,
        "total_time": 1800
}

export const mockrequestobject =  {
    'origin':["22.33","33.44"],
    'destination':["44.55","55.66"]
};

//manually creating a mock function to return and resolved promise response 
const fetchDirectionsApi = jest.fn()
                           .mockResolvedValue(mockresponse)
export default fetchDirectionsApi;
