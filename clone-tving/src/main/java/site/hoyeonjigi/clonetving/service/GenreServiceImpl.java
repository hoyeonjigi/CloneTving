package site.hoyeonjigi.clonetving.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import site.hoyeonjigi.clonetving.domain.GenreEntity;
import site.hoyeonjigi.clonetving.exception.ResourceNotFoundException;
import site.hoyeonjigi.clonetving.repository.GenreRepository;

@Service
@RequiredArgsConstructor
public class GenreServiceImpl implements GenreService{

    private final GenreRepository genreRepository;

    @Override
    public String getGenreName(String genreId) {
        Optional<GenreEntity> genreOptional = genreRepository.findById(genreId);
        if(genreOptional.isPresent()){
            return genreOptional.get().getGenreName();
        }
        else{
            throw new ResourceNotFoundException("장르가 존재하지 않습니다");
        }
    }
    
}
