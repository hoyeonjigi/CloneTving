package site.hoyeonjigi.clonetving.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor 
@Builder
public class GenreDto {

    private String genreId;
    private String genreName;
}
