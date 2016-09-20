'use strict';

var fs = require('fs');
var postcss = require('postcss');

const BLACK_STAR = '\\|';
const DEVICE_NAMESPACES = ['', 'xs', 'sm', 'md', 'lg', 'xl'];
const FRACTION_BASES = [1,2,3,4,5,6];

module.exports = postcss.plugin('blackstar', function myplugin(options) {
  return function(root) {
    options = options || {};
    let combineRules = { root: {}, xs: {}, sm: {}, md: {}, lg: {}, xl: {} };
    root.walkAtRules('blackstar', (atRule) => {

      DEVICE_NAMESPACES.forEach((namespace) => {
        createFractions(combineRules, namespace, FRACTION_BASES);
        addGuttersHash(combineRules, namespace);
        addFlushRules(combineRules, namespace);
      });

      // Output rules to stylesheet
      Object.keys(combineRules.root).forEach((k) => {
        let rule = combineRules.root[k];
        atRule.parent.insertBefore(atRule, rule);
      });

      appendMediaQueryRules(atRule, combineRules.xs, '(max-width: 544px)');
      appendMediaQueryRules(atRule, combineRules.sm, '(min-width: 545px) and (max-width: 767px)');
      appendMediaQueryRules(atRule, combineRules.md, '(min-width: 768px) and (max-width: 1023px)');
      appendMediaQueryRules(atRule, combineRules.lg, '(min-width: 1024px)');
      appendMediaQueryRules(atRule, combineRules.xl, '(min-width: 1280px)');
      atRule.remove();
      fs.writeFileSync('rules.json', JSON.stringify(combineRules));
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
    className += `-${fractions.join('\\|')}`;
  }
  return className;
}

function getFlushClassName(namespace, side) {
  let className = getClassName(namespace);
  let sideKey = side === 'left' ? 'flushLeft' : 'flushRight';
  return `[class*="${BLACK_STAR}"]${className}-\\|${sideKey}`;
}

function createFractions(combineRules, namespace, fractions) {
  fractions.forEach((fraction) => {
    let whole = 1;
    while (whole === 1 || whole < fraction) {
      // Rule with no nesting
      createFractionRule(combineRules, namespace, whole, fraction, []);
      // Single level of nesting
      fractions.forEach((nestedFraction) => {
        let nestedWhole = 1;
        while (nestedWhole === 1 || nestedWhole < nestedFraction) {
          createFractionRule(combineRules, namespace, whole, fraction, [[nestedWhole,nestedFraction]]);
          nestedWhole++;
        }
      });
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
  if (namespace) {
    addRuleToHash(combineRules[namespace], ruleValue,
      [getClassName(), '>'].concat(cssSelector).join(' '));
  } else {
    addRuleToHash(combineRules.root, ruleValue,
      [getClassName(), '>'].concat(cssSelector).join(' '));
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
      rule.append({ prop: 'display', value: 'inline-block' });
      rule.append({ prop: 'width', value: ruleValue });
    }
  } else {
    rule.selectors = rule.selectors.concat(ruleSelector);
  }
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

function addGuttersHash(combineRules, namespace) {
  let ruleHash = combineRules[namespace || 'root'];
  let ruleValue = 'gutters';
  let ruleSelector = getClassName(namespace) + '--gutters';
  let guttersRule = ruleHash[ruleValue];
  if (!guttersRule) {
    guttersRule = ruleHash[ruleValue] = postcss.rule({
      selectors: [
        ruleSelector,
        ruleSelector + ` > [class*="${BLACK_STAR}"]`
      ]
    });
    guttersRule.append({ prop: 'padding-left', value: '.5rem' });
    guttersRule.append({ prop: 'padding-right', value: '.5rem' });
  }
  return guttersRule;
}

function addFlushRules(combineRules, namespace) {
  let cssSelector = [getClassName(), '>'];
  let leftCssSelector = cssSelector.concat([getFlushClassName(namespace, 'left')]);
  let rightCssSelector = cssSelector.concat([getFlushClassName(namespace, 'right')]);
  addFlushHash(combineRules, namespace, 'left',
    leftCssSelector.join(' '));
  addFlushHash(combineRules, namespace, 'right',
    rightCssSelector.join(' '));
}

function addFlushHash(combineRules, namespace, side, ruleSelector) {
  let ruleHash = combineRules[namespace || 'root'];
  let ruleValue = side === 'left' ? 'flushLeft' : 'flushRight';
  let flushLeftRule = ruleHash[ruleValue];
  if (!flushLeftRule) {
    flushLeftRule = ruleHash[ruleValue] = postcss.rule({
      selectors: [ruleSelector]
    });
    flushLeftRule.append({ prop: 'padding-' + side, value: 0 });
  } else {
    flushLeftRule.selectors = flushLeftRule.selectors.concat(ruleSelector);
  }
  return flushLeftRule;
}
