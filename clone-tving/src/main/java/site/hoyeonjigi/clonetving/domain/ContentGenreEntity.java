package site.hoyeonjigi.clonetving.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "content_genre")
@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@IdClass(ContentGenreEntityPK.class)
public class ContentGenreEntity {

    @Id
    @ManyToOne
    @JoinColumn(name = "content_id")
    private ContentEntity content;

    @Id
    @ManyToOne
    @JoinColumn(name = "genre_id")
    private GenreEntity genre;

    public Object get() {
        return null;
    }

}
