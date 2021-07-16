import { formatDate, formatDateToIso } from "./formatDate";

const dateMock = new Date("2021-05-13T03:35:00-03:00");

describe("Format Date.", () => {
  it("should to format date to 13/05/21", () => {
    const formatedDate = formatDate((dateMock), "dd/MM/yy");
    expect(formatedDate).toBe("13/05/21");
  })

  it("should to format date to 13 de maio", () => {
    const formatedDate = formatDate((dateMock), "dd 'de' MMMM");
    expect(formatedDate).toBe("13 de maio");
  })

  it("should to format date to maio de 2021", () => {
    const formatedDate = formatDate((dateMock), "MMMM 'de' yyyy");
    expect(formatedDate).toBe("maio de 2021");
  })
})

describe("Format date object to iso.", () => {
  test("should to return iso date string.", () => {
    const dateParsedToIso = formatDateToIso(dateMock);
    expect(dateParsedToIso).toEqual("2021-05-13T03:35:00-03:00");
  })
})
