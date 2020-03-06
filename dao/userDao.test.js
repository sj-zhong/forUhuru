import { add, queryAll } form './userDao'

test('test add', (done) => {
  const requst = {
    nmae:"a",
    age: 12,
    sex:"f",
    telephone:123,
    postNum:321,
    address:"bb"
  };
  add((reques,res,0) => {
        expect(res).toEqual({ code:200,message: 
        });
  });
  done();
})
