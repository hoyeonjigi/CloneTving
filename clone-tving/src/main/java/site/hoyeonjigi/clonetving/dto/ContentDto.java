package site.hoyeonjigi.clonetving.dto;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.hoyeonjigi.clonetving.domain.ContentEntity;


@Getter
@NoArgsConstructor
@AllArgsConstructor 
@Builder
public class ContentDto {

    private String contentId;
    private String contentClassification;
    private String contentTitle;
    private Date contentReleaseDate;
    private int contentView;
    private String contentOverview;
    private String contentImage;
    private boolean contentRating;
    private List<String> genres = new ArrayList<String>();
    private List<EvaluationDto> evaluations = new ArrayList<EvaluationDto>();

    public ContentDto (ContentEntity contentEntity){
        this.contentId = contentEntity.getContentId();
        this.contentClassification = contentEntity.getContentClassification();
        this.contentTitle = contentEntity.getContentTitle();
        this.contentReleaseDate = contentEntity.getContentReleaseDate();
        this.contentView = contentEntity.getContentView();
        this.contentOverview = contentEntity.getContentOverview();
        this.contentImage = contentEntity.getContentImage();
        this.contentRating = contentEntity.isContentRating();
        this.genres = contentEntity.getGenres().stream().map(o -> o.getGenre().getGenreId())
                                                    .collect(Collectors.toList());
        this.evaluations = contentEntity.getEvaluations().stream().map(o -> new EvaluationDto(o))
                                                    .collect(Collectors.toList());                                            
                                                    
    }
}
