import mongoose from "mongoose";
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../backend/server';
import moment from 'moment';

import Workout from '../backend/models/Workout';


let should = chai.should();
chai.use(chaiHttp);

//Our parent block
describe('Workout', () => {
    beforeEach((done) => { //Before each test we empty the database
        Workout.remove({}, (err) => { 
           done();         
        });     
    });
/*
  * Test the /GET route
  */
  describe('GET /api/workout', () => {
      it('it should GET all the workouts', (done) => {
        chai.request(server)
            .get('/api/workout')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.status.should.equal('SUCCESS');
                res.body.data.should.be.a('array');
                res.body.data.length.should.equal(0);
              done();
            });
      });
  });

  /*
    * Test the /POST route
    */
    describe('/POST /api/workout', () => {
        it('it should not create Workout without required info', (done) => {
          let workout = {};
          chai.request(server)
            .post('/api/workout')
            .send(workout)
            .end((err, res) => {
                res.should.have.status(500);
              done();
            });
        });

        it('it should create Workout with required info', (done) => {
          let workout = {
            "date": "2017-01-02",
            "name": "leg day",
            "userId": "587d93fdf4864eaf9cd8b923"
          };
          chai.request(server)
            .post('/api/workout')
            .send(workout)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.status.should.equal('SUCCESS');
              res.body.data.should.be.a('object');
              moment(res.body.data.date).utc().format('YYYY-MM-DD').should.equal(moment(workout.date).utc().format('YYYY-MM-DD'));
              res.body.data.name.should.equal(workout.name);
              res.body.data.userId.should.equal(workout.userId);
              done();
            });
        });

        it('it should not create Workout with same date and userId', (done) => {
          let workout = {
            "date": "2017-01-02",
            "name": "leg day 2",
            "userId": "587d93fdf4864eaf9cd8b923"
          };
          chai.request(server)
            .post('/api/workout')
            .send(workout)
            .end((err, res) => {
              res.should.have.status(500);
              done();
            });
        });

    });
});