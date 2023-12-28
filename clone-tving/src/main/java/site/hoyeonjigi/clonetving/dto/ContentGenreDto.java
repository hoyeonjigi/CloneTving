package site.hoyeonjigi.clonetving.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.hoyeonjigi.clonetving.domain.ContentGenreEntity;

@Getter
@NoArgsConstructor
@AllArgsConstructor 
@Builder
public class ContentGenreDto {

    private String content;
    private String genre;
    
    public ContentGenreDto (ContentGenreEntity contentGenreEntity) {
        this.content = contentGenreEntity.getContent().getContentId();
        this.genre = contentGenreEntity.getGenre().getGenreId();
    }
}
