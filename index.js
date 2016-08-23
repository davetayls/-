'use strict';

var postcss = require('postcss');

const BLACK_STAR = '★';

module.exports = postcss.plugin('blackstar', function myplugin(options) {
  return function(root) {
    options = options || {};
    let combineRules = {
      root: {}
    };
    root.walkAtRules('blackstar', (atRule) => {
      // const params = atRule.params === '' ? ['', ''] : /(\w+) ?(.*)?/.exec(atRule.params);
      // if (params == null || params.length < 1) return;
      // const prefix = params[1];
      // const mediaQuery = params[2];
      // console.log('blackstar', prefix, mediaQuery);
      // if (mediaQuery) {
      //   const mediaRule = postcss.atRule({
      //     name: 'media',
      //     params: mediaQuery
      //   });
      //   atRule.parent.insertBefore(atRule, mediaRule);
      //   createPrefixStyles(mediaRule, prefix, true);
      // }
      // createPrefixStyles(combineRules, 'sm', false);
      createFractionRule(combineRules, 'sm', 1, 2);
      createFractionRule(combineRules, 'md', 1, 2);
      createFractionRule(combineRules, 'sm', 1, 2, ['1/4']);
      Object.keys(combineRules.root).forEach((k) => {
        let rule = combineRules.root[k];
        atRule.parent.insertBefore(atRule, rule);
      });
      atRule.remove();
    });
  }
});

function createPrefixStyles(combineRules, prefix, inMediaQ) {
  // if (inMediaQ) {
  //   atRule.append(createWholeRule(prefix, inMediaQ));
  // } else {
  //   atRule.parent.insertBefore(
  //     atRule,
  //     createWholeRule(prefix, inMediaQ)
  //   );
  // }
  createFractions(combineRules, prefix, inMediaQ, [2,3,4,6]);
  // createFractions(atRule, prefix, inMediaQ, 3);
  // createFractions(atRule, prefix, inMediaQ, 4);
  // createFractions(atRule, prefix, inMediaQ, 6);
}

function createFractions(atRule, prefix, inMediaQ, fractions) {
  let whole = 1;
  let fraction = fractions[0];
  while (whole < fraction) {
    let rule = createFractionRule(
      prefix,
      inMediaQ,
      [[whole, fraction]]
    );
    if (inMediaQ) {
      atRule.append(rule);
    } else {
      atRule.parent.insertBefore(atRule, rule);
    }
    whole++;
  }
}

function createFractionRule(combineRules, namespace, whole, fraction, nesting) {
  let nesting = `.${BLACK_STAR}${namespace}`;
  // if (!inMediaQ) nesting += prefix;
  let preColumns = `${nesting} .${BLACK_STAR}${namespace}-\\|`;
  let fractionNesting = `${whole}\\/${fraction}`;
  let widthPercentage = (whole * 100) / fraction;
  let ruleValue = `${widthPercentage}%`;
  let ruleSelector = `${preColumns}${fractionNesting}`;
  let rule = combineRules.root[ruleValue];
  if (!rule) {
    rule = combineRules.root[ruleValue] = postcss.rule({
      selectors: [ruleSelector]
    });
    rule.append({ prop: 'width', value: ruleValue });
  } else {
    rule.selectors = rule.selectors.concat(ruleSelector);
  }
  console.log(rule.selectors);
  return rule;
}

function createWholeRule(prefix, inMediaQ) {
  let rule = postcss.rule({
    selector: `.${BLACK_STAR}${inMediaQ ? '' : prefix} .${BLACK_STAR}${prefix}-\\|1`
  });
  rule.append({ prop: 'display', value: 'block' });
  rule.append({ prop: 'width', value: 'auto' });
  return rule;
}
