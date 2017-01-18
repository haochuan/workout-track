import mongoose from "mongoose";
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../backend/server';
import moment from 'moment';

import Workout from '../backend/models/Workout';


let should = chai.should();
chai.use(chaiHttp);

//Our parent block
describe('Workout Test Suites', () => {
    before((done) => { //Before each test we empty the database
        Workout.remove({}, (err) => { 
           done();         
        });     
    });
  /*
  * Test the /GET /api/workout
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
    * Test the /POST /api/workout
    */
    describe('POST /api/workout', () => {
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

      it('it should create Workout with same date but not same userId', (done) => {
        let workout = {
          "date": "2017-01-02",
          "name": "leg day 2",
          "userId": "587d93fdf4864eaf9cd8b922"
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

      it('it should create Workout with same userId but not same date', (done) => {
        let workout = {
          "date": "2017-01-04",
          "name": "leg day 2",
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
    });

    /*
    * Test the /GET /api/workout/:workoutId
    */
    describe('GET /api/workout/:workoutId', () => {
      it('it should GET one workout with the workoutId', (done) => {
        let newWorkout = new Workout({
          "date": "2017-01-05",
          "name": "leg day 2",
          "userId": "587d93fdf4864eaf9cd8b923"
        });

        newWorkout.save((err, workout) => {
          chai.request(server)
          .get('/api/workout/' + workout.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.status.should.equal('SUCCESS');
            res.body.data.should.be.a('object');
            moment(res.body.data.date).utc().format('YYYY-MM-DD').should.equal(moment(workout.date).utc().format('YYYY-MM-DD'));
            res.body.data.name.should.equal(workout.name);
            res.body.data._id.should.equal(workout.id);
            res.body.data.userId.should.equal(workout.userId.toString());
            done();
          });
        });
      });

      it('it should GET 404 with the invalid workoutId', (done) => {
        chai.request(server)
        .get('/api/workout/' + "587d93fdf4864eaf9cd8b930")
        .end((err, res) => {
          res.should.have.status(404);
          res.body.status.should.equal('NOTFOUND');
          done();
        });
      });
    });

    /*
    * Test the /PUT /api/workout/:workoutId
    */
    describe('PUT /api/workout/:workoutId', () => {
      let updateInfo = {
        date: '2017-01-07', 
        name: 'leg day 6'
      };

      it('it should UPDATE one workout with the workoutId', (done) => {
        let newWorkout = new Workout({
          "date": "2017-01-06",
          "name": "leg day 5",
          "userId": "587d93fdf4864eaf9cd8b923"
        });
        newWorkout.save((err, workout) => {
          chai.request(server)
          .put('/api/workout/' + workout.id)
          .send(updateInfo)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.status.should.equal('SUCCESS');
            res.body.data.should.be.a('object');
            moment(res.body.data.date).utc().format('YYYY-MM-DD').should.equal(moment(updateInfo.date).utc().format('YYYY-MM-DD'));
            res.body.data.name.should.equal(updateInfo.name);
            res.body.data._id.should.equal(workout.id);
            res.body.data.userId.should.equal(workout.userId.toString());
            done();
          });
        });
      });

      it('it should GET 404 with the invalid workoutId', (done) => {
        chai.request(server)
        .put('/api/workout/' + "587d93fdf4864eaf9cd8b930")
        .send(updateInfo)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.status.should.equal('NOTFOUND');
          done();
        });
      });
    });
});