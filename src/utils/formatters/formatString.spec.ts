import { formatStringToCapitalize } from "./formatString"


describe("Format string to Capitalize.", () => {
  test("should to format string poker to Poker", () => {
    const formatedString = formatStringToCapitalize("poker");

    expect(formatedString).toEqual("Poker")
  })
})
