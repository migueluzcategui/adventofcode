pub type Input = (Vec<u32>, Vec<u32>);

/// Parses a multiline string into a tuple of two vectors of `u32` values.
/// Each line in the input string should contain exactly two numbers, separated by whitespace.
/// The first number will be added to the first vector, and the second number will be added to the second vector.
///
/// # Example:
///
/// ```
/// use advent_of_code::utils::parse_string_to_vector_of_integers;
///
/// const EXAMPLE: &str = "\
/// 3   4\n\
/// 4   3\n\
/// 2   5\n\
/// 1   3\n\
/// 3   9\n\
/// 3   3";
///
/// let (first_vec, second_vec) = parse_string_to_vector_of_integers(EXAMPLE);
///
/// assert_eq!(first_vec, vec![3, 4, 2, 1, 3, 3]);
/// assert_eq!(second_vec, vec![4, 3, 5, 3, 9, 3]);
/// ```
pub fn parse_string_to_vector_of_integers(input: &str) -> (Vec<u32>, Vec<u32>) {
    let mut first_vec = Vec::new();
    let mut second_vec = Vec::new();

    for line in input.lines() {
        let line = line.trim();
        let mut parts = line.split_whitespace();

        if let (Some(first), Some(second)) = (parts.next(), parts.next()) {
            if let (Ok(first_num), Ok(second_num)) = (first.parse::<u32>(), second.parse::<u32>()) {
                first_vec.push(first_num);
                second_vec.push(second_num);
            }
        }
    }

    (first_vec, second_vec)
}

#[cfg(test)]
mod parser_tests {
    use super::*;

    #[test]
    fn test_parse_valid_input() {
        const EXAMPLE: &str = "\
        3   4\n\
        4   3\n\
        2   5\n\
        1   3\n\
        3   9\n\
        3   3";

        let (first_vec, second_vec) = parse_string_to_vector_of_integers(EXAMPLE);

        assert_eq!(first_vec, vec![3, 4, 2, 1, 3, 3]);
        assert_eq!(second_vec, vec![4, 3, 5, 3, 9, 3]);
    }

    #[test]
    fn test_parse_empty_input() {
        const EMPTY_INPUT: &str = "";

        let (first_vec, second_vec) = parse_string_to_vector_of_integers(EMPTY_INPUT);

        // Empty input should result in empty vectors
        assert_eq!(first_vec, Vec::<u32>::new());
        assert_eq!(second_vec, Vec::<u32>::new());
    }

    #[test]
    fn test_parse_single_line_input() {
        const SINGLE_LINE: &str = "5 10";

        let (first_vec, second_vec) = parse_string_to_vector_of_integers(SINGLE_LINE);

        // Should parse one pair of values into vectors
        assert_eq!(first_vec, vec![5]);
        assert_eq!(second_vec, vec![10]);
    }

    #[test]
    fn test_parse_malformed_input() {
        const MALFORMED_INPUT: &str = "\
        3   4\n\
        5   \n\
        6   7";

        let (first_vec, second_vec) = parse_string_to_vector_of_integers(MALFORMED_INPUT);

        // The second line is malformed (missing one value), so it should be skipped
        assert_eq!(first_vec, vec![3, 6]);
        assert_eq!(second_vec, vec![4, 7]);
    }
}
