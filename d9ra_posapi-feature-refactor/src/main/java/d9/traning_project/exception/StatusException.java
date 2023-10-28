package d9.traning_project.exception;

import d9.traning_project.model.domain.GenericEntity;

public class StatusException extends GenericException{
    public StatusException(Class<? extends GenericEntity> clazz) {
        super(clazz);
    }
}
