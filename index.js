'use strict';

var postcss = require('postcss');

const BLACK_STAR = '★';

module.exports = postcss.plugin('blackstar', function myplugin(options) {
  return function(root) {
    options = options || {};
    let combineRules = {
      root: {},
      sm: {},
      md: {},
      lg: {}
    };
    root.walkAtRules('blackstar', (atRule) => {
      // Whole Rules
      createFractionRule(combineRules, '', 1, 1);
      createFractionRule(combineRules, 'sm', 1, 1);
      createFractionRule(combineRules, 'md', 1, 1);
      createFractionRule(combineRules, 'lg', 1, 1);

      // Fractions
      createFractions(combineRules, '', [2,3,4,6]);
      createFractions(combineRules, 'sm', [2,3,4,6]);
      createFractions(combineRules, 'md', [2,3,4,6]);
      createFractions(combineRules, 'lg', [2,3,4,6]);

      // Output rules to stylesheet
      Object.keys(combineRules.root).forEach((k) => {
        let rule = combineRules.root[k];
        atRule.parent.insertBefore(atRule, rule);
      });
      appendMediaQueryRules(atRule, combineRules.sm, '(max-width: 599px)');
      appendMediaQueryRules(atRule, combineRules.md, '(min-width: 600px)');
      appendMediaQueryRules(atRule, combineRules.lg, '(min-width: 699px)');
      atRule.remove();
    });
  }
});

function getClassName(namespace, fractionParts) {
  let className = `.${BLACK_STAR}${namespace || ''}`;
  if (fractionParts && fractionParts.length) {
    let fractions = fractionParts
      .filter((part) => part && part.length === 2)
      .map((part) => {
        return part[0] === part[1] ? part[0] : `${part[0]}\\/${part[1]}`
      });
    className += `-\\|${fractions.join('\\|')}`;
  }
  return className;
}

function createFractions(combineRules, namespace, fractions) {
  fractions.forEach((fraction) => {
    let whole = 1;
    while (whole < fraction) {
      createFractionRule(
        combineRules,
        namespace,
        whole,
        fraction,
        []
      );
      whole++;
    }
  });
}

function createFractionRule(combineRules, namespace, whole, fraction, insideFractions) {
  insideFractions = insideFractions || [];
  let cssSelector = [];
  let widthPercentage = (whole * 100) / fraction;
  let ruleValue = `${widthPercentage}%`;
  if (insideFractions && insideFractions.length) {
    cssSelector.push(getClassName(namespace, insideFractions));
  }
  cssSelector.push(getClassName(namespace, insideFractions.concat([[whole,fraction]])));
  addRuleToHash(combineRules.root, ruleValue,
    [getClassName(namespace)].concat(cssSelector).join(' '));
  if (namespace) {
    addRuleToHash(combineRules[namespace], ruleValue,
      [getClassName()].concat(cssSelector).join(' '));
  }
}

function addRuleToHash(ruleHash, ruleValue, ruleSelector) {
  let rule = ruleHash[ruleValue];
  if (!rule) {
    rule = ruleHash[ruleValue] = postcss.rule({
      selectors: [ruleSelector]
    });
    if (ruleValue === '100%') {
      rule.append({ prop: 'display', value: 'block' });
      rule.append({ prop: 'width', value: 'auto' });
    } else {
      rule.append({ prop: 'width', value: ruleValue });
    }
  } else {
    rule.selectors = rule.selectors.concat(ruleSelector);
  }
  console.log(rule.selectors);
  return rule;
}

function appendMediaQueryRules(atRule, rules, params) {
  const mqRule = postcss.atRule({
    name: 'media',
    params: params
  });
  atRule.parent.insertBefore(atRule, mqRule);
  Object.keys(rules).forEach((k) => {
    let rule = rules[k];
    mqRule.append(rule);
  });
}
