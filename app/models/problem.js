import DS from "ember-data";
import { computed } from '@ember/object';

export default DS.Model.extend({
  name: DS.attr(),
  content: DS.attr(),
  submissions: DS.hasMany('submission'),
  mostSuccessfullSubmission: computed('submissions', function(){
    const submissions = this.submissions;
    return submissions.reduce((acc, curr)=> acc.get("score")>= curr.get("score")? acc: curr, submissions.objectAt(0))
  }),
  hasTopSubmissionPassed: computed('submissions', function(){
    const topSubmission = this.submissions.objectAt(0)
    
    if(!topSubmission.get('isErrored')){
      return !topSubmission.get('judge-result.data.testcases').reduce((acc, val)=> acc = val.result !== 'correct'? ++acc: acc, 0)
    }
    return false;
  }),
  "code-challenge": DS.belongsTo('code-challenge')
})