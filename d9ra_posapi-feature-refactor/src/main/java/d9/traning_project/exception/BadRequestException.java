package d9.traning_project.exception;

import d9.traning_project.model.domain.GenericEntity;

public class BadRequestException extends GenericException {

    public BadRequestException(Class<? extends GenericEntity> clazz) {
        super(clazz);
    }
}
