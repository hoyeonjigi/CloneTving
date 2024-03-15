package site.hoyeonjigi.clonetving.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.hoyeonjigi.clonetving.service.GenreService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/genre")
@RequiredArgsConstructor
public class GenreController {

    private final GenreService genreService;
    
    @GetMapping("/{genreId}")
    public String genreName(@PathVariable("genreId") String genreId) {
        String genreName = genreService.getGenreName(genreId);
        return genreName;
    }
    
}
