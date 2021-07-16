import { useStorage } from "./useStorage";

const { setStorageData, getStorageData, removeSorageData } = useStorage();

const obj = {
  poker: ""
}

describe("Test Storage helper.", () => {
  test("should to save data in storage and return undfined", () => {
    const storageResultSet = setStorageData(obj);

    expect(storageResultSet).toEqual(undefined);
  })

  test("should to return data of storage", () => {
    const storageResultGet = getStorageData<{ poker: string }>([
      "poker"
    ]);

    expect(storageResultGet).toMatchObject(obj);
  })

  test("should to remove data in storage and return undfined", () => {
    const storageResultGet = removeSorageData([
      "poker"
    ]);

    expect(storageResultGet).toBe(undefined);
  })
})
