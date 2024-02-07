package site.hoyeonjigi.clonetving.dto;

import java.sql.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MyBatisContentDto {
    private String contentId;
    private String contentClassification;
    private String contentTitle;
    private Date contentReleaseDate;
    private int contentView;
    private String contentOverview;
    private String contentImage;
    private boolean contentRating;
    private String genreIds;
}
