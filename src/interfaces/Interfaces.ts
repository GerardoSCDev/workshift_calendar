export interface IInformationData {
    text: string
    backgroundColor: string
  }
export interface IDropDown {
    titleText: string
    items: string[]
    selectedValue?: string | undefined
    onValueChange?: ((itemValue: string, itemIndex: number) => void) | undefined
  }