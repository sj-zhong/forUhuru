import { add, queryAll } form './userDao'

test('test add', (done) => {
  const requst = {
    nmae:"a",
    age: 12,
    sex:"f",
    telephone:123,
    postNum:321,
    address:"bb"
  },
  expect(add(reques,0,0)).toEqual({code:200,message: }
  )
})
