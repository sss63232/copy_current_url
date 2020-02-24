import { getTabLinkOption } from '../../../src/background/copyHandler'

describe('getTabLinkOption', () => {
  it('default getTabLinkOption should be empty', () => {
    const result = getTabLinkOption()
    expect(result).toEqual({})
  })
})
