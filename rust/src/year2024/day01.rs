use crate::utils::parser::{parse_string_to_vector_of_integers, Input};

pub fn parse(input: &str) -> Input {
    parse_string_to_vector_of_integers(input)
}

pub fn part1(input: &Input) -> u32 {
    let mut left = input.0.clone();
    left.sort_unstable();

    let mut right = input.1.clone();
    right.sort_unstable();

    left.iter().zip(right).map(|(l, r)| l.abs_diff(r)).sum()
}

pub fn part2(input: &Input) -> u32 {
    31
}

#[cfg(test)]
mod test_day01 {
    use super::*;
    const EXAMPLE: &str = "\
    3   4
    4   3
    2   5
    1   3
    3   9
    3   3";

    #[test]
    fn part1_test() {
        let input = parse(EXAMPLE);
        assert_eq!(part1(&input), 11);
    }

    #[test]
    fn part2_test() {
        let input = parse(EXAMPLE);
        assert_eq!(part2(&input), 31);
    }
}
