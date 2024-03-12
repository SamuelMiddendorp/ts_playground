
let left = { age: 20, level: undefined, race: "spartan" };
let right = { age: 20, level: undefined, race: "spartan" };

let res = compare(left, right);

console.log(res);



function compare(left: entity, right: entity): ComparisonResult {
    let res = {
        age: compareHigherLower(left.age, right.age),
        level: compareHigherLower(left.level, right.level),
        race: compareBinary(left.race, right.race)
    };

    return {
        age: res.age,
        level: res.level,
        race: res.race,
        correct: res.race.correct && res.level.correct && res.age.correct
    }
}

function compareBinary(left: string | undefined, right: string | undefined): BinaryComparisonNode {
    if (left == right) {
        return {
            comparable: true,
            result: BinaryComparisonResult.Correct, 
            correct: true
        }
    }

    if (!left || !right) {
        return {
            comparable: false,
            correct: false,
            result: undefined
        }
    }

    return {
        comparable: true,
        correct: false,
        result: BinaryComparisonResult.Incorrect
    }
}

function compareHigherLower(left: number | undefined, right: number | undefined): HigherLowerComparisonNode {
    if (left == right) {
        return {
            comparable: true,
            correct: true,
            result: HigherLowerComparisonResult.Correct
        }
    }

    if (!left || !right) {
        return {
            comparable: false,
            correct: false,
            result: undefined
        }
    }

    if (left > right) {
        return {
            comparable: true,
            correct: false,
            result: HigherLowerComparisonResult.Higher
        }
    }

    return {
        comparable: true,
        correct: false,
        result: HigherLowerComparisonResult.Lower
    }
}

enum HigherLowerComparisonResult {
    Higher,
    Lower,
    Correct
}

enum BinaryComparisonResult {
    Correct,
    Incorrect,
}

interface ComparisonResult {
    age: HigherLowerComparisonNode,
    race: BinaryComparisonNode,
    level: HigherLowerComparisonNode
    correct: boolean;
}

interface ComparisonNode<T> {
    comparable: boolean;
    correct: boolean;
    result: undefined | T
}

interface BinaryComparisonNode extends ComparisonNode<BinaryComparisonResult> {
}

interface HigherLowerComparisonNode extends ComparisonNode<HigherLowerComparisonResult> {
}

interface entity {
    age: number,
    race: string,
    level: number | undefined
}