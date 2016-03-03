import {expect}       from 'chai'
import {Form, inputs} from 'riot-form'

describe('FormBuilder', () => {
  it('should build a form', () => {
    expect(new Form.Builder().setName('hello').build()).to.be.instanceof(Form)
  })

  it('should throw when input do not have a name', () => {
    const builder = new Form.Builder()
    expect(() => builder.addInput({type: 'text'})).to.throw(Error)
  })

  it('should raise on inexisting input type', () => {
    const builder = new Form.Builder()
    expect(() => builder.addInput({type: 'wtf', name: 'foo'})).to.throw(Error)
  })

  describe('setModel', () => {
    it('should set model', () => {
      const form = new Form.Builder()
              .setModel({name: 'foo'})
              .setName('foo')
              .build()
      expect(form.model.name).to.eq('foo')
    })
  })

  describe('addInput', () => {
    it('should add input from plain objects', () => {
      const name = 'hello'
      const form = new Form.Builder()
              .setName('foo')
              .addInput({name: name, type: 'text'})
              .build()
      expect(form.inputsCount).to.eq(1)
      expect(form.inputs[name].name).to.eq(name)
    })

    it('should add input from input objects', () => {
      const form = new Form.Builder()
              .setName('foo')
              .addInput(new inputs.TextInput({name: 'hello'}))
              .setName('foo')
              .build()
      expect(form.inputsCount).to.eq(1)
      expect(form.inputs.hello.name).to.eq('hello')
    })
  })

  describe('addInputs', () => {
    it('should add multiple inputs', () => {
      const form = new Form.Builder()
              .setName('foo')
              .addInputs([
                {name: 'foo', type: 'text'},
                {name: 'bar', type: 'text'}
              ])
              .setName('foo')
              .build()

      expect(form.inputsCount).to.eq(2)
      expect(form.inputs.foo.name).to.eq('foo')
    })
  })


  it('should create a form with value prefilled', () => {
    const form = new Form.Builder()
            .setName('foo')
            .addInput({name: 'name', type: 'text'})
            .setModel({name: 'Daniel'})
            .build()

    expect(form.inputs.name.value).to.eq('Daniel')
    expect(form.model).to.deep.eq({name: 'Daniel'})
  })
})
