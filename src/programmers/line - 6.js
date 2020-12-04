const { assert } = require('chai');

const inputs = [
  [["A fabdec 2", "B cebdfa 2", "C ecfadb 2"], ["a BAC 1", "b BAC 3", "c BCA 2", "d ABC 3", "e BCA 3", "f ABC 2"]],
  [["A abc 2", "B abc 1"], ["a AB 1", "b AB 1", "c AB 1"]]
];

const outputs = [
  ["A_bf", "B_ce", "C_d"],
  ["A_ab", "B_"]
]

function main([companies, applicants]) {
  const companies2 = {};
  companies.forEach((v) => {
    const [name, priority, num] = v.split(' ');
    companies2[name] = [priority, num, []];
  })

  const applicants2 = {};
  applicants.forEach((v) => {
    const [name, companies, num] = v.split(' ');
    applicants2[name] = companies.slice(0, parseInt(num)).split('');
  });

  let rejecteds = Object.keys(applicants2);

  while (rejecteds.length > 0) {

    rejecteds.forEach((name) => {
      const companys = applicants2[name];
      if (companys.length === 0) {
        delete applicants2[name];
      } else {
        companies2[companys[0]][2].push(name);
      }
    })
    rejecteds = [];

    Object.entries(companies2).forEach(([name, company]) => {
      const [priority, num, applicants] = company;
      applicants.sort((a, b) => priority.indexOf(a) - priority.indexOf(b))

      for (let i = num; i < applicants.length; i++) {
        const applicant = applicants[i];
        rejecteds.push(applicant);

        const companyArr = applicants2[applicant];
        if (companyArr) {
          const index = companyArr.indexOf(name);
          if (index >= 0) {
            companyArr.splice(index, 1);
          }
        }
      }
      applicants.splice(parseInt(num), applicants.length - parseInt(num));
    });
  }

  return Object.entries(companies2).map(([name, company]) => {
    const [order, num, applicants] = company;
    applicants.sort((a, b) => a.localeCompare(b));
    const tmp = applicants.join('');

    return `${name}_${tmp}`
  })
}

describe(__filename.split('/').pop().replace('.js', ''), () => {
  inputs.forEach((input, i) => {
    it(JSON.stringify(input).substr(0, 50), () => {
      assert.deepEqual(main(input), outputs[i]);
    })
  })
})
