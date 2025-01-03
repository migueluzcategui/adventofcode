#![allow(unstable_features)]
#![feature(test)]
extern crate test;

macro_rules! benchmark {
    ($year:tt $($day:tt),*) => {
        mod $year {$(
            mod $day {
                use advent_of_code::$year::$day::*;
                use std::fs::read_to_string;
                use std::path::Path;
                use std::sync::LazyLock;
                use test::Bencher;

                static DATA: LazyLock<String> = LazyLock::new(|| {
                    let year = stringify!($year);
                    let day = stringify!($day);
                    let path = Path::new("..").join("input").join(year).join(day).with_extension("txt");
                    read_to_string(path).unwrap()
                });

                #[bench]
                fn parse_bench(b: &mut Bencher) {
                    let data = &DATA;
                    b.iter(|| parse(data));
                }

                #[bench]
                fn part1_bench(b: &mut Bencher) {
                    let input = parse(&DATA);
                    b.iter(|| part1(&input));
                }

                #[bench]
                fn part2_bench(b: &mut Bencher) {
                    let input = parse(&DATA);
                    b.iter(|| part2(&input));
                }
            }
        )*}
    }
}

benchmark!(year2024
    day01
);
