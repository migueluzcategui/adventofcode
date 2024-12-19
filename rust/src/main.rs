use advent_of_code::*;
use std::env::args;
use std::fs::read_to_string;
use std::iter::empty;
use std::path::{Path, PathBuf};
use std::time::{Duration, Instant};

pub mod utils;

fn main() {
    // Parse command line options
    let (year, day) = parse_year_and_day();

    let challenges: Vec<_> = empty()
        .chain(year2024())
        .filter(|challenge| {
            year.clone().is_none_or(|y| y == (challenge.year))
                && day.clone().is_none_or(|d| d == (challenge.day))
        })
        .collect();

    // Pretty print output for each solution.
    let mut duration = Duration::ZERO;

    for CodeChallenge { year, day, path, runner } in &challenges {
        if let Ok(data) = read_to_string(path) {
            let instant = Instant::now();
            let (part1, part2) = runner(data);
            duration += instant.elapsed();

            println!("{year} Day {day}");
            println!("Result on part 1: {part1}");
            println!("Result on part 2: {part2}");
        } else {
            eprintln!(
                "{year} Day {day:02} - Unable to read input file. {} does not exist.",
                path.display()
            );
        }
    }
}

struct CodeChallenge {
    year: String,
    day: String,
    path: PathBuf,
    runner: fn(String) -> (String, String),
}

// Parse year and day from command line arguments
fn parse_year_and_day() -> (Option<String>, Option<String>) {
    match args().nth(1) {
        Some(arg) => {
            // Directly split the string by whitespace and capture year and day
            let mut parts = arg.split_whitespace();
            (parts.next().map(str::to_string), parts.next().map(str::to_string))
        }
        None => (None, None), // Return None if no argument is provided
    }
}

// Macro to generate CodeChallenge instances for each year and day
macro_rules! run {
    ($year:tt $($day:tt),*) => {
        fn $year() -> Vec<CodeChallenge> {
            vec![$({
                let year = stringify!($year);
                let day = stringify!($day);
                let path = Path::new("..").join("input").join(year).join(day).with_extension("txt");

                let runner = |data: String| {
                    use $year::$day::*;

                    let input = parse(&data);
                    let part1 = part1(&input);
                    let part2 = part2(&input);

                    (part1.to_string(), part2.to_string())
                };

                CodeChallenge { year: year.to_string(), day: day.to_string(), path, runner }
            },)*]
        }
    }
}

run!(year2024
    day01
);
