const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

let expect = chai.expect;
let should = chai.should();

const server = require('../server.js');

describe ('Test User Routes', () => {
    let id;

    //Teste de criacao de usuario (POST)
    it('should create a new user', (done) => {
        chai.request(server)
        .post('/users/create')
        .send({name: "claudio", age: 24, phone: 996332670})
        .end((err, res) => {
            expect(res).to.have.status(200);
               
            id = res.body.id;
            done();
        });
    }); 
 
    //Teste de recuperacao de usuario (GET)
    it('should return a user by id', (done) => {
        chai.request(server)
        .get('/users/' + id)
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.not.be.undefined;
            done();
        });
    }); 
   
    //Teste de alteracao de usuario (PUT)
    it('should update a user by id', () => {
        chai.request(server)
        .put('/users/' + id)
        .send({name: "claudio caldeirao", age: 24, phone: 996332670})
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.eql('User updated successfully!');
        });
    });         
    
    //Teste de remocao de usuario (DELETE)
    it('should update a user by id', () => {
        chai.request(server)
        .delete('/users/' + id)
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.eql('User Deleted successfully!');
        });
    });
});