import mongoose from "mongoose";
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../backend/server';
import moment from 'moment';

import Exercise from '../backend/models/Exercise';


let should = chai.should();
chai.use(chaiHttp);

//Our parent block
describe('Exercise Test Suites', () => {
    before((done) => { //Before each test we empty the database
        Exercise.remove({}, (err) => { 
           done();         
        });     
    });
  /*
  * Test the /GET /api/exercise
  */
  describe('GET /api/exercise', () => {
    it('it should GET all the exercises', (done) => {
      chai.request(server)
      .get('/api/exercise')
      .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.equal(0);
        done();
      });
    });
  });

    /*
    * Test the /POST /api/exercise
    */
    describe('POST /api/exercise', () => {
      it('it should not create exercise without required info', (done) => {
        let exercise = {};
        chai.request(server)
          .post('/api/exercise')
          .send(exercise)
          .end((err, res) => {
              res.should.have.status(500);
            done();
          });
      });

      it('it should create exercise with required info', (done) => {
        let exercise = {
          "type": "low reps",
          "name": "bench press",
          "sets": 5,
          "reps": 5,
          "weights": 120, 
          "userId": "587d93fdf4864eaf9cd8b923",
          "workoutId": "687d93fdf4864eaf9cd8b923"
        };
        chai.request(server)
          .post('/api/exercise')
          .send(exercise)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            moment(res.body.date).utc().format('YYYY-MM-DD').should.equal(moment(exercise.date).utc().format('YYYY-MM-DD'));
            res.body.name.should.equal(exercise.name);
            res.body.type.should.equal(exercise.type);
            res.body.sets.should.equal(exercise.sets);
            res.body.reps.should.equal(exercise.reps);
            res.body.weights.should.equal(exercise.weights);
            res.body.workoutId.should.equal(exercise.workoutId);
            res.body.userId.should.equal(exercise.userId);
            done();
          });
      });

      it('it should not create exercise with same workoutId', (done) => {
        let exercise = {
          "type": "low reps",
          "name": "bench press",
          "sets": 5,
          "reps": 5,
          "weights": 120, 
          "userId": "587d93fdf4864eaf9cd8b923",
          "workoutId": "687d93fdf4864eaf9cd8b923"
        };
        chai.request(server)
          .post('/api/exercise')
          .send(exercise)
          .end((err, res) => {
            res.should.have.status(500);
            done();
          });
      });

      it('it should create exercise with different workoutId', (done) => {
        let exercise = {
          "type": "low reps",
          "name": "bench press",
          "sets": 5,
          "reps": 5,
          "weights": 120, 
          "userId": "587d93fdf4864eaf9cd8b923",
          "workoutId": "687d93fdf4864eaf9cd8b924"
        };
        chai.request(server)
          .post('/api/exercise')
          .send(exercise)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            moment(res.body.date).utc().format('YYYY-MM-DD').should.equal(moment(exercise.date).utc().format('YYYY-MM-DD'));
            res.body.name.should.equal(exercise.name);
            res.body.type.should.equal(exercise.type);
            res.body.sets.should.equal(exercise.sets);
            res.body.reps.should.equal(exercise.reps);
            res.body.weights.should.equal(exercise.weights);
            res.body.workoutId.should.equal(exercise.workoutId);
            res.body.userId.should.equal(exercise.userId);
            done();
          });
      });
    });

    /*
    * Test the /GET /api/exercise/:exerciseId
    */
    describe('GET /api/exercise/:exerciseId', () => {
      it('it should GET one exercise with the exerciseId', (done) => {
        let newExercise = new Exercise({
          "type": "low reps",
          "name": "bench press",
          "sets": 5,
          "reps": 5,
          "weights": 120, 
          "userId": "587d93fdf4864eaf9cd8b923",
          "workoutId": "687d93fdf4864eaf9cd8b925"
        });

        newExercise.save((err, exercise) => {
          chai.request(server)
          .get('/api/exercise/' + exercise.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            moment(res.body.date).utc().format('YYYY-MM-DD').should.equal(moment(exercise.date).utc().format('YYYY-MM-DD'));
            res.body.name.should.equal(exercise.name);
            res.body.type.should.equal(exercise.type);
            res.body.sets.should.equal(exercise.sets);
            res.body.reps.should.equal(exercise.reps);
            res.body.weights.should.equal(exercise.weights);
            res.body._id.should.equal(exercise.id);
            res.body.workoutId.should.equal(exercise.workoutId.toString());
            done();
          });
        });
      });

      it('it should GET 404 with the invalid exerciseId', (done) => {
        chai.request(server)
        .get('/api/exercise/' + "587d93fdf4864eaf9cd8b930")
        .end((err, res) => {
          res.should.have.status(404);
          res.body.status.should.equal('NOTFOUND');
          done();
        });
      });
    });

    /*
    * Test the /PUT /api/exercise/:exerciseId
    */
    describe('PUT /api/exercise/:exerciseId', () => {
      let updateInfo = {
        "type": "low reps modified",
        "name": "bench press modified",
        "sets": 4,
        "reps": 4,
        "weights": 100, 
      };

      it('it should UPDATE one exercise with the workoutId', (done) => {
        let newExercise = new Exercise({
          "type": "low reps",
          "name": "bench press",
          "sets": 5,
          "reps": 5,
          "weights": 120, 
          "userId": "587d93fdf4864eaf9cd8b923",
          "workoutId": "687d93fdf4864eaf9cd8b926"
        });
        newExercise.save((err, exercise) => {
          chai.request(server)
          .put('/api/exercise/' + exercise.id)
          .send(updateInfo)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            moment(res.body.date).utc().format('YYYY-MM-DD').should.equal(moment(updateInfo.date).utc().format('YYYY-MM-DD'));
            res.body.name.should.equal(updateInfo.name);
            res.body.type.should.equal(updateInfo.type);
            res.body.sets.should.equal(updateInfo.sets);
            res.body.reps.should.equal(updateInfo.reps);
            res.body.weights.should.equal(updateInfo.weights);
            res.body._id.should.equal(exercise.id);
            res.body.workoutId.should.equal(exercise.workoutId.toString());
            done();
          });
        });
      });

      it('it should GET 404 with the invalid exerciseId', (done) => {
        chai.request(server)
        .put('/api/exercise/' + "587d93fdf4864eaf9cd8b930")
        .send(updateInfo)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.status.should.equal('NOTFOUND');
          done();
        });
      });
    });

    /*
    * Test the /DELETE /api/exercise/:exerciseId
    */
    describe('DELETE /api/exercise/:exerciseId', () => {
      it('it should DELETE one exercise with the workoutId', (done) => {
        let newExercise = new Exercise({
          "type": "low reps",
          "name": "bench press",
          "sets": 5,
          "reps": 5,
          "weights": 120, 
          "userId": "587d93fdf4864eaf9cd8b923",
          "workoutId": "687d93fdf4864eaf9cd8b927"
        });
        newExercise.save((err, exercise) => {
          chai.request(server)
          .delete('/api/exercise/' + exercise.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('ok', 1);
            res.body.should.have.property('n', 1);
            done();
          });
        });
      });

      it('it should GET 404 with the invalid exerciseId', (done) => {
        chai.request(server)
        .delete('/api/exercise/' + "587d93fdf4864eaf9cd8b944")
        .end((err, res) => {
          res.should.have.status(404);
          res.body.status.should.equal('NOTFOUND');
          done();
        });
      });
    });
});