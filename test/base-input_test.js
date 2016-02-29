import {expect}    from 'chai'
import {BaseInput} from '..'

class DummyInput extends BaseInput {
}
DummyInput.defaultTag = 'dummy-tag'

describe('BaseInput', () => {
  it('should throw error when no name present', () => {
    expect(() => new DummyInput({})).to.throw(Error)
  })

  describe('name', () => {
    it('should return config name', () => {
      const input = new DummyInput({name: 'hello'})
      expect(input.name).to.eq('hello')
    })
  })

  describe('value', () => {
    it('should trigger event on value changed', () => {
      const input = new DummyInput({name: 'hello'})
      let called = false
      const value = 'new value'
      input.on('change', (v) => {
        called = true
        expect(v).to.eq(value)
      })
      input.value = value
      expect(called).to.be.true
    })
  })

  describe('tag', () => {
    it('should return default tag when no tag given', () => {
      const input = new DummyInput({name: 'hello'})
      expect(input.tag).to.eq('dummy-tag')
    })

    it('should return config tag when given', () => {
      const input = new DummyInput({name: 'hello', tag: 'custom-tag'})
      expect(input.tag).to.eq('custom-tag')
    })
  })

  describe('process', () => {
    it('should be called when present', () => {
      const input = new DummyInput({
        name: 'hello',
        process: (v) => v.trim()
      })
      input.value = '  hello   '
      expect(input.value).to.eq('hello')
    })
  })

  describe('validate', () => {
    it('should be called when present', () => {
      const errors = ['should contain only numbers']
      const input = new DummyInput({
        name: 'hello',
        validate: (v) => /^[0-9]+/.exec(v) || errors
      })
      input.value = 'hello'
      expect(input.errors).to.deep.eq(errors)
    })
  })
})
