use crate::utils::parser::{parse_string_to_vector_of_integers, Input};

pub fn parse(input: &str) -> Input {
    parse_string_to_vector_of_integers(input)
}

pub fn part1(input: &Input) -> u32 {
    // Clone and sort both lists in a single statement
    let (mut first_list, mut second_list) = (input.0.clone(), input.1.clone());
    first_list.sort_unstable();
    second_list.sort_unstable();

    // merge the two lists and sum the absolute differences
    first_list
        .iter()
        .zip(second_list)
        .map(|(first_list_item, second_list_item)| first_list_item.abs_diff(second_list_item))
        .sum()
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
