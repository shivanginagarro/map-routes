export const mockresponse = { "maps" : {}}
const mapInitOnLoad = jest.fn()
                      .mockResolvedValue(mockresponse)
export default mapInitOnLoad;